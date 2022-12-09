export const requestApi = async (q)=>{
  const url1 = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${q}&ts=1&apikey=${process.env.API_KEY_MARVEL}`;
  try {
    const results = await fetch(url1);
    const jsonR = await results.json();
    const resfinal = jsonR.data.results
    return resfinal
  } catch (e) {
    console.log(e);
  }
}
