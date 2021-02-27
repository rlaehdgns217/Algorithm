//1. 페어를 만든다(수강생이 50명일 경우 150개의 경우의수)
//2. pair가 선호하는 사람,
const autoTeam = (data) => {
  let students = [];
  let jokers = [];
  let teams = [];
  let result = {};
  for (let key in data) {
    students.push(key);
  }

  const isFav = (name, favorite) => {
    if (name === "" || favorite === "") return false;
    if (data[name].Favorite.includes(favorite)) return true;
    else return false;
  };
  const isCross = (name, favorite) => {
    if (name === "" || favorite === "") return false;
    else if (isFav(name, favorite) && isFav(favorite, name)) return true;
    else return false;
  };
  const isDiff = (name, difficult) => {
    if (name === "" || difficult === "") return false;
    if (
      data[name].Difficult.includes(difficult) ||
      data[difficult].Difficult.includes(name)
    )
      return true;
    else return false;
  };

  const makeJoker = (name) => {
    const fav_first = data[name].Favorite[0];
    const fav_second = data[name].Favorite[1];
    const fav_third = data[name].Favorite[2];
    const dif_first = data[name].Difficult[0];
    const dif_second = data[name].Difficult[1];
    const dif_third = data[name].Difficult[2];
    if (fav_first === "" && fav_second === "" && fav_third === "") {
      if (dif_first === "" && dif_second === "" && dif_third === "") {
        jokers.push(name);
      }
    }
  };
  const makePair = (name) => {
    const pairs = [];
    const haters = [];
    const lovers = [];
    for (let i = 0; i < 3; i += 1) {
      if (
        data[name].Favorite[i] !== "" &&
        !isDiff(name, data[name].Favorite[i])
      ) {
        pairs.push([name, data[name].Favorite[i]]);
        haters.push(
          Array.from(
            new Set(
              data[name].Difficult.concat(
                data[data[name].Favorite[i]].Difficult
              )
            )
          )
        );
        lovers.push(
          Array.from(
            new Set(
              data[name].Favorite.concat(data[data[name].Favorite[i]].Favorite)
            )
          )
        );
      }
    }

    console.log("pairs:", pairs);
    console.log("haters:", haters);
    console.log("lovers:", lovers);
    //   let jsonArr = Array.from(new Set(teams));
  };
  // for (let key in data){
  //   makePair(key)
  // }
  makePair(); //이곳에 이름 입력
  //------------------------------------------------

  //   const makeTeam = (student, team) => {
  //     let fav = data[student].Favorite;

  //     if (team.length === 4) {
  //       return team;
  //     }
  //     if (!team.includes(student)) {
  //       team.push(student);
  //     }
  //     for (let i = 0; i < 3; i += 1) {
  //       if (isCross(student, fav[i])) {
  //         let check = false;
  //         for (let j = 0; j < team.length; j += 1) {
  //           if (isDiff(team[j], fav[i]) === true) check = true;
  //         }
  //         if (check === false && !team.includes(fav[i])) {
  //           team.push(fav[i]);
  //           return makeTeam(fav[i], team);
  //         }
  //       } else if (isFav(student, fav[i])) {
  //         let check = false;
  //         for (let j = 0; j < team.length; j += 1) {
  //           if (isDiff(team[j], fav[i]) === true) {
  //             check = true;
  //           }
  //         }
  //         if (check === false && team.includes(fav[i]) === false) {
  //           team.push(fav[i]);
  //           return makeTeam(fav[i], team);
  //         }
  //       } else if (fav[0] === "" && fav[1] === "" && fav[2] === "") {
  //         let check = false;
  //         for (let j = 0; j < team.length; j += 1) {
  //           if (isDiff(team[j], fav[i]) === true) {
  //             check = true;
  //           }
  //         }
  //         if (check === false && team.includes(student) === false) {
  //           team.push(student);
  //           return (
  //             makeTeam(team[0], team) ||
  //             makeTeam(team[1], team) ||
  //             makeTeam(team[2], team)
  //           );
  //         } else {
  //           if (team.length < 3) {
  //             jokers.push(student);
  //             return team;
  //           }
  //           return team;
  //         }
  //       } else {
  //         if (team.length < 3) {
  //           return (
  //             makeTeam(team[0], team) ||
  //             makeTeam(team[1], team) ||
  //             makeTeam(team[2], team)
  //           );
  //         }

  //         ("check필요!!");
  //         return team;
  //       }
  //     }
  //   };

  //   for (let key in data) {
  //     students.push(key);
  //     teams.push(JSON.stringify(makeTeam(key, []).sort()));
  //   }
  //   let jsonArr = Array.from(new Set(teams));
  //   let newArr = [];
  //   for (let i = 0; i < jsonArr.length; i += 1) {
  //     newArr.push(JSON.parse(jsonArr[i]));
  //   }
  //   for (let i = 0; i < students.length; i += 1) {
  //     if (
  //       newArr
  //         .filter((team) => team.length === 4)
  //         .filter((arr) => arr.includes(students[i])).length === 1
  //     ) {
  //       result[students[i]] = newArr
  //         .filter((team) => team.length === 4)
  //         .filter((arr) => arr.includes(students[i]))[0];
  //     } else {
  //       console.log(
  //         newArr
  //           .filter((team) => team.length === 4)
  //           .filter((arr) => arr.includes(students[i])),
  //         "student:",
  //         students[i]
  //       );
  //     }
  //   }
};

//20210227 point 버전
const autoTeam = (data) => {
  const result = [];
  const sortArr = [];
  const team = {};

  const isFav = (name, favorite) => {
    if (name === "" || favorite === "") return false;
    if (data[name].Favorite.includes(favorite)) return true;
    else return false;
  };
  const isCross = (name, favorite) => {
    if (name === "" || favorite === "") return false;
    else if (isFav(name, favorite) && isFav(favorite, name)) return true;
    else return false;
  };
  const isDiff = (name, difficult) => {
    if (name === "" || difficult === "") return false;
    if (
      data[name].Difficult.includes(difficult) ||
      data[difficult].Difficult.includes(name)
    )
      return true;
    else return false;
  };

  const makePoint = (name) => {
    let point = 0;

    for (let key in data) {
      if (data[key].Favorite.includes(name)) {
        point++;
      }
    }
    sortArr.push([name, point]);
  };
  const makeSort = () => {
    for (let key in data) {
      makePoint(key);
    }

    return sortArr.sort((a, b) => b[1] - a[1]);
  };
  const makeLead = () => {
    let peopleNumber = 0;
    for (let key in data) {
      peopleNumber++;
    }
    makeSort();

    if (peopleNumber % 4 === 0) {
      for (let i = 0; i < peopleNumber / 4; i += 1) {
        team[i + 1] = [sortArr[i][0]];
      }
      return team;
    } else if (peopleNumber % 4 === 1) {
      for (let i = 0; i < (peopleNumber - 9) / 4 + 3; i += 1) {
        team[i + 1] = [sortArr[i][0]];
      }
      return team;
    } else if (peopleNumber % 4 === 2) {
      for (let i = 0; i < (peopleNumber - 6) / 4 + 2; i += 1) {
        team[i + 1] = [sortArr[i][0]];
      }
      return team;
    } else if (peopleNumber % 4 === 3) {
      for (let i = 0; i < (peopleNumber - 3) / 4 + 1; i += 1) {
        let teamLead = sortArr[i][0];

        if (isCross(teamLead, data[teamLead].Favorite[0])) {
          team[i + 1] = [teamLead, data[teamLead].Favorite[0]];
        }
      }
      return team;
    }
  };

  makeLead();

  console.log(team);
};
