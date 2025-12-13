// Funkcia na výber náhodného prvku z poľa
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Funkcia na náhodné vygenerovanie dátumu narodenia
function randomBirthdate(minAge, maxAge) {
  const now = new Date();

  // Najväčši možný dátum (maxAge)
  const minDate = new Date(
    now.getFullYear() - maxAge,
    now.getMonth(),
    now.getDate()
  );
  // Najmenši možný dátum (minAge)
  const maxDate = new Date(
    now.getFullYear() - minAge,
    now.getMonth(),
    now.getDate()
  );
  // Výber náhodného dátumu medzi minDate a maxDate
  const timestamp =
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());

  return new Date(timestamp).toISOString();
}

//Funkcia na generovvanie zamestnancov (vytvoril som novu funkciu) -dtoOut
function generateEmployeeData(dtoIn) {
  // Rozdelenie mien podľa pohlavia (muž a žena) + priezviska
  const maleNames = ["Jan", "Petr", "Lukáš", "Tomáš", "Radek", "Josef", "Martin", "Marek", "Karel", "Roman"];
  const femaleNames = ["Jana", "Petra", "Eva", "Tereza", "Lucie", "Alena", "Hana", "Marie", "Veronika", "Nikola"];
  const maleSurnames = ["Novák", "Svoboda", "Dvořák", "Černý", "Procházka", "Kučera", "Urban", "Sýkora", "Beneš", "Fiala"];
  const femaleSurnames = ["Nováková", "Svobodová", "Dvořáková", "Černá", "Procházková", "Kučerová", "Urbanová", "Sýkorová", "Benešová", "Fialová"];

  const workloads = [10, 20, 30, 40];
  const result = []; // dtoOut musí byť pole objektov

 // Generovanie požadovaného počtu zamestnancov
  for (let i = 0; i < dtoIn.count; i++) {
    // Náhodné pohlavie (muž/žena)
    const gender = Math.random() < 0.5 ? "male" : "female";

    // Výber mena podľa pohlavia
    const name = gender === "male" ? randomItem(maleNames) : randomItem(femaleNames);
    const surname = gender === "male" ? randomItem(maleSurnames) : randomItem(femaleSurnames);

    // Zostavenie jedného zamestnanca
    const employee = {
      gender: gender, // musí byť "muž" alebo "žena"
      birthdate: randomBirthdate(dtoIn.age.min, dtoIn.age.max),
      name: name,
      surname: surname,
      workload: randomItem(workloads)
    };

    result.push(employee);
  }

  return result;
}

//Funkcia pre štatistiky zamestnancov
function getEmployeeStatistics(employees) {

  // vypocet veku
  const ages = employees.map(e => {
    const b = new Date(e.birthdate);
    return Math.floor((Date.now() - b.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  });

  const workloads = employees.map(e => e.workload);
  //funkcia na vypočet medianu
  function median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  //Vratia sa nam štatistiky zamestnancov
  return {
    total: employees.length,
    workload10: employees.filter(e => e.workload === 10).length,
    workload20: employees.filter(e => e.workload === 20).length,
    workload30: employees.filter(e => e.workload === 30).length,
    workload40: employees.filter(e => e.workload === 40).length,

    averageAge: Number((ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1)),
    minAge: Math.min(...ages),
    maxAge: Math.max(...ages),
    medianAge: median(ages),

    medianWorkload: median(workloads),
    averageWorkload: Number((workloads.reduce((a, b) => a + b, 0) / workloads.length).toFixed(1)),

    sortedByWorkload: [...employees].sort((a, b) => a.workload - b.workload)
  };
}

//Hlavna funkcia programu  vypiše nam štatistiky zamestnancov + jednotlivych zamestnancov
function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const statistics = getEmployeeStatistics(employees);
  return statistics;
}

// dto vstup
const dtoIn = {
  count: 50,
  age: {
    min: 18,
    max: 55
  }
};

// Spustenie programu a výstup dto
const dtoOut = main(dtoIn);
console.log(dtoOut);