import { BsStarHalf, BsStar, BsStarFill } from "react-icons/bs";

function getColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function shuffle(arr) {
  let temp;

  for (let i = 0; i < arr.length; i++) {
    let rndNum = getRandomIntInclusive(0, arr.length - 1);
    temp = arr[i];
    arr[i] = arr[rndNum];
    arr[rndNum] = temp;
  }

  return arr;
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function renderRating(tripRating) {
  let elTripRatingStars = [];
  let classNameStr = "rating-star";
  for (let i = 0; i < 5; i++) {
      let elTemplate;
      tripRating -= 1;
      if (tripRating >= 0) {
          elTemplate = (
              <div className={classNameStr} key={i}>
                  <BsStarFill />
              </div>
          )
      } else if (tripRating > -1) {
          elTemplate = (
              <div className={classNameStr}  key={i}>
                  <BsStarHalf />
              </div>
          )
      } else {
          elTemplate = (
              <div className={classNameStr}  key={i}>
                  <BsStar />
              </div>
          )
      }
      elTripRatingStars.push(elTemplate);
  }
  return elTripRatingStars;
}

const exportedObj = {
  getColor,
  shuffle,
  getRandomIntInclusive,
  renderRating
}

export default exportedObj;