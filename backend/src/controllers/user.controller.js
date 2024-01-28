import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // 1 Get user details from frontend
  // 2 Validation - not empty
  // 3 check if user already exists - username, email
  // 4 check for images, check for avatar
  // 5 upload them to cloudinary, avatar
  // 6 create user object - create entry in DB
  // 7 remove password and refresh token field from response
  // 8 check for user creation
  // 9 return response

  const { username, email, fullName, password } = req.body;
  // console.log({ username, email, fullName, password });

  // console.log(
  //   "test",
  //   [username, email, fullName, password].some((field) => field?.trim() === "")
  // );
  if (
    [username, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill the required fields");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email of username already exists.");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // console.log({ avatarLocalPath, coverImageLocalPath });

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
  });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Somethings went wrong! while registering the user."
    );
  }
  console.log("user create successfully");
  return res
    .status(201)
    .json(
      new APIResponse(200, createdUser, "User register successfully", true)
    );
});

export { registerUser };