const autoTeam = (data) => {
  let students = [];
  let jokers = [];
  let teams = [];
  let result = {};

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

  const makeTeam = (student, team) => {
    let fav = data[student].Favorite;

    if (team.length === 4) {
      return team;
    }
    if (!team.includes(student)) {
      team.push(student);
    }
    for (let i = 0; i < 3; i += 1) {
      if (isCross(student, fav[i])) {
        let check = false;
        for (let j = 0; j < team.length; j += 1) {
          if (isDiff(team[j], fav[i]) === true) check = true;
        }
        if (check === false && !team.includes(fav[i])) {
          team.push(fav[i]);
          return makeTeam(fav[i], team);
        }
      } else if (isFav(student, fav[i])) {
        let check = false;
        for (let j = 0; j < team.length; j += 1) {
          if (isDiff(team[j], fav[i]) === true) {
            check = true;
          }
        }
        if (check === false && team.includes(fav[i]) === false) {
          team.push(fav[i]);
          return makeTeam(fav[i], team);
        }
      } else if (fav[0] === "" && fav[1] === "" && fav[2] === "") {
        let check = false;
        for (let j = 0; j < team.length; j += 1) {
          if (isDiff(team[j], fav[i]) === true) {
            check = true;
          }
        }
        if (check === false && team.includes(student) === false) {
          team.push(student);
          return (
            makeTeam(team[0], team) ||
            makeTeam(team[1], team) ||
            makeTeam(team[2], team)
          );
        } else {
          if (team.length < 3) {
            jokers.push(student);
            return team;
          }
          return team;
        }
      } else {
        if (team.length < 3) {
          return (
            makeTeam(team[0], team) ||
            makeTeam(team[1], team) ||
            makeTeam(team[2], team)
          );
        }
        console.log("check필요!!");
        return team;
      }
    }
  };

  for (let key in data) {
    students.push(key);
    teams.push(JSON.stringify(makeTeam(key, []).sort()));
  }

  // console.log(students.filter((student) => {
  //    return !makeTeam(students[0],[]).includes(student)
  //  }))

  let jsonArr = Array.from(new Set(teams));
  let newArr = [];
  for (let i = 0; i < jsonArr.length; i += 1) {
    newArr.push(JSON.parse(jsonArr[i]));
  }
  for (let i = 0; i < students.length; i += 1) {
    if (
      newArr
        .filter((team) => team.length === 4)
        .filter((arr) => arr.includes(students[i])).length === 1
    ) {
      result[students[i]] = newArr
        .filter((team) => team.length === 4)
        .filter((arr) => arr.includes(students[i]))[0];
    } else {
      console.log(
        newArr
          .filter((team) => team.length === 4)
          .filter((arr) => arr.includes(students[i])),
        "student:",
        students[i]
      );
    }
  }

  console.log(result);
};
