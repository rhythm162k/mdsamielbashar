// Drop your files into /public/images, then point to them here.
// Leave a value as null to keep the placeholder.
//
//   portrait: img('portrait.jpg'),
//
const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

export const IMAGES = {
  logo: img("logo.png"), // square, about 96 x 96 (png, svg or webp)
  portrait: img("potrait.png"), // portrait, 4:5 (for example 1200 x 1500)
  movieDiary: img("movie_diary.png"), // screenshot, 16:9 (for example 2000 x 1125)
  firstCost: img("first_cost.png"), // screenshot, 16:9
};

export { img };
