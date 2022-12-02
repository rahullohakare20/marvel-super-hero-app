export const handleImage = (heroDetailData, type) => {
  const { path, extension } = heroDetailData.thumbnail;
  const ImageUrl = `${path}/${type}.${extension}`;

  return ImageUrl;
}