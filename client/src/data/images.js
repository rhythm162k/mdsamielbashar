const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

// Files live in client/public/images. Change a name here if you swap a picture.
export const IMAGES = {
  logo: img("logo.webp"), // square, shown tiny in the nav (128 x 128 is plenty)
  portrait: img("portrait.webp"), // 4:5 (1200 x 1500)
  movieDiary: img("movie-diary.webp"), // project screenshot (16:9 or similar)
  kinCRM: img("kinCrm.webp"),
};

export { img };
