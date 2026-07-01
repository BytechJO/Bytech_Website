const getPublicIdsFromMedia = (media = []) => {
  if (!Array.isArray(media)) return [];

  return media.map((item) => item?.public_id).filter(Boolean);
};

const getRemovedPublicIds = (oldMedia = [], newMedia = []) => {
  const oldIds = getPublicIdsFromMedia(oldMedia);
  const newIds = new Set(getPublicIdsFromMedia(newMedia));

  return oldIds.filter((publicId) => !newIds.has(publicId));
};

module.exports = {
  getPublicIdsFromMedia,
  getRemovedPublicIds,
};
