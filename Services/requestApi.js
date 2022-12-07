//https://gateway.marvel.com:443/v1/public/characters?apikey=5ab42191e80dab763b2eea835666ce40
/*
key public: 5ab42191e80dab763b2eea835666ce40
key private: 727fc3585c895a95df4353513fee29f29d659788
ts= 1 
1727fc3585c895a95df4353513fee29f29d6597885ab42191e80dab763b2eea835666ce40

hash= b91a1843f8d721b87e6d361cec1798a5
fetching
//https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=5ab42191e80dab763b2eea835666ce40&hash=b91a1843f8d721b87e6d361cec1798a5
*/

export const requestApi = async (q)=>{
  const url1 = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${q}&ts=1&apikey=5ab42191e80dab763b2eea835666ce40&hash=b91a1843f8d721b87e6d361cec1798a5`;
  try {
    const results = await fetch(url1);
    const jsonR = await results.json();
    // const resfinal = jsonR
    const resfinal = jsonR.data.results
    // console.log(resfinal);
    return resfinal
  } catch (e) {
    console.log(e);
  }
}
