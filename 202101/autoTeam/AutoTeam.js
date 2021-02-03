const autoTeam = (data) => {
  let students = [];
  let jokers = [];
  let teams = [];

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
    let dif = data[student].Difficult;

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
            console.log(team[j], fav[i]);
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
          return makeTeam(team[0], team);
        }
      } else {
        console.log(student, team, "Check 필요!");
        if (!team.includes(student)) {
          team.push(student);
          return makeTeam(student, team);
        }
        jokers.push(student);
      }
    }
  };

  for (let key in data) {
    students.push(key);
    if (teams.includes(makeTeam(key, []).sort())) {
      console.log(makeTeam(key, []).sort());
    }
  }

  students.filter((student) => {
    return !makeTeam(students[0], []).includes(student);
  });

  console.log(makeTeam("A", []));
};
