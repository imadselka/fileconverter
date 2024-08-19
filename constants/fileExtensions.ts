export const fileExtensions = {
  image: ["png", "jpg", "gif", "webp", "tiff"],
  document: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"],
  audio: ["mp3", "wav", "aac", "flac", "ogg"],
  video: ["mp4", "mov", "avi", "mkv", "flv", "wmv"],
};

export const getExtensionsByType = (fileType: string): string[] => {
  switch (true) {
    case fileType.startsWith("image/"):
      return fileExtensions.image;
    case fileType.startsWith("audio/"):
      return fileExtensions.audio;
    case fileType.startsWith("video/"):
      return fileExtensions.video;
    case fileType === "application/pdf":
    case fileType === "application/msword":
    case fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case fileType === "application/vnd.ms-excel":
    case fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case fileType === "application/vnd.ms-powerpoint":
    case fileType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return fileExtensions.document;
    default:
      return [];
  }
};
