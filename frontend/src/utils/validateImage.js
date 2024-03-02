
export const validateImage = (value) => {
  if (!value) return true; // If no image is selected, validation passes

  const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
  const file = value[0]; // Access the first file in the FileList

  if (!allowedFormats.includes(file.type)) {
    // Check if the file type is not in the allowed formats
    return "Supported image formats are JPG, JPEG, and PNG.";
  }

  return true; // Validation passes if the file format is allowed
};
