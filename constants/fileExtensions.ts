export const fileExtensions = {
  image: ["png", "jpeg", "jpg", "gif", "webp", "tiff"],
  document: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"],
  audio: ["mp3", "wav", "aac", "flac", "ogg"],
  video: ["mp4", "mov", "avi", "mkv", "flv", "wmv"],
};

// Function to get extensions based on file type
export const getExtensionsByType = (fileType: string): string[] => {
  switch (fileType) {
    case "image":
      return fileExtensions.image;
    case "document":
      return fileExtensions.document;
    case "audio":
      return fileExtensions.audio;
    case "video":
      return fileExtensions.video;
    default:
      return [];
  }
};
