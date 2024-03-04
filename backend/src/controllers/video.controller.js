import { v2 as cloudinary } from "cloudinary";
import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  let filter = {};

  // If userId is provided, filter videos by user ID
  if (userId) {
    filter.owner = userId;
  }

  // Construct the sort object based on sortBy and sortType
  let sort = {};
  if (sortBy && sortType) {
    sort[sortBy] = sortType === "asc" ? 1 : -1;
  }

  // Perform the database query with pagination, filtering, sorting, and optional query
  const videos = await Video.find({
    $or: [
      { title: { $regex: query || "", $options: "i" } }, // Search by title
      { description: { $regex: query || "", $options: "i" } }, // Search by description
    ],
    ...filter,
  })
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  // Count total number of videos without pagination
  const totalVideos = await Video.countDocuments({
    $or: [
      { title: { $regex: query || "", $options: "i" } },
      { description: { $regex: query || "", $options: "i" } },
    ],
    ...filter,
  });

  return res.status(200).json(
    new APIResponse(
      200,
      {
        data: videos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(totalVideos / limit),
          totalVideos,
        },
      },
      "Get all video successfully."
    )
  );

  res.status(200).json({
    success: true,
    data: videos,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalVideos / limit),
      totalVideos,
    },
  });
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video

  const videoFileLocalPath = req.files?.videoFile[0]?.path;
  const thumbnailFileLocalPath = req.files?.thumbnail[0]?.path;

  if (!title || !description) {
    return res
      .status(400)
      .json(new ApiError(400, "Title and description is required"));
  }
  if (!videoFileLocalPath) {
    return res.status(400).json(new ApiError(400, "Video is required"));
  }
  if (!thumbnailFileLocalPath) {
    return res.status(400).json(new ApiError(400, "Video is required"));
  }

  const videoUpload = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailFileLocalPath);

  if (!videoUpload) {
    return res
      .status(400)
      .json(new ApiError(400, "Video file not uploaded please try again."));
  }
  if (!thumbnail) {
    return res
      .status(400)
      .json(new ApiError(400, "thumbnail file not uploaded please try again."));
  }

  const video = await Video.create({
    title,
    description,
    videoFile: videoUpload?.url || "",
    thumbnail: thumbnail?.url || "",
    duration: videoUpload?.duration,
    owner: req.user?._id,
  });

  return res
    .status(200)
    .json(new APIResponse(200, video, "Video upload successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id

  if (!isValidObjectId(videoId)) {
    return res
      .status(404)
      .json(new ApiError(404, "Invalid video ID, No video found."));
  }

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId), // Convert videoId to ObjectId
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner_details",
      },
    },
    {
      $addFields: {
        owner_details: {
          $arrayElemAt: ["$owner_details", 0],
        },
      },
    },
    {
      $project: {
        owner_details: {
          _id: 1,
          username: 1,
          email: 1,
          fullName: 1,
          avatar: 1,
        },
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        isPublished: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new APIResponse(200, video, "Video details fetch successfully."));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    return res
      .status(404)
      .json(new ApiError(404, "Invalid video ID, No video found."));
  }

  const { title, description } = req.body;
  const thumbnailFileLocalPath = req.file?.path;

  // Upload thumbnail to Cloudinary if a new thumbnail is provided
  let thumbnail;
  if (thumbnailFileLocalPath) {
    thumbnail = await uploadOnCloudinary(thumbnailFileLocalPath);
    if (!thumbnail) {
      return res
        .status(500)
        .json(new ApiError(500, "Something is wrong thumbnail not uploaded."));
    }
  }

  // Create an object to hold the fields to update
  const updateFields = {};

  // Add title and description to the updateFields if provided
  if (title) {
    updateFields.title = title;
  }
  if (description) {
    updateFields.description = description;
  }

  // Add thumbnail URL to updateFields if a new thumbnail is uploaded
  if (thumbnail) {
    updateFields.thumbnail = thumbnail.url;
  }

  // Perform the update operation only if there are fields to update
  if (Object.keys(updateFields).length > 0) {
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { $set: updateFields },
      { new: true }
    );

    return res
      .status(200)
      .json(new APIResponse(200, updatedVideo, "Video updated successfully"));
  } else {
    // No fields to update, return the existing video data
    const existingVideo = await Video.findById(videoId);
    return res
      .status(200)
      .json(
        new APIResponse(
          200,
          existingVideo,
          "No changes detected, existing video data returned"
        )
      );
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  if (!isValidObjectId(videoId)) {
    return res
      .status(404)
      .json(new ApiError(404, "Invalid video ID, No video found."));
  }

  const video = await Video.findById(videoId);
  if (!video) {
    return res
      .status(404)
      .json(new ApiError(404, "No video found with this ID."));
  }

  // Delete the video from your database
  const videoDelete = await Video.findByIdAndDelete(videoId);

  // Delete the video from Cloudinary
  if (video.thumbnail) {
    await cloudinary.uploader.destroy(video.thumbnail);
  }

  return res
    .status(201)
    .json(new APIResponse(201, videoDelete, "Video delete successfully."));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
