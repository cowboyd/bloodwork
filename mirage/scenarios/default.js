export default function configure(server) {
  let phil = server.create('patient', {
    name: "Phil Lowell",
    birthday: new Date(1931, 7, 9),
    weight: 185,
    targetHgB: 9.5,
    gender: "M"
  });

  let horace = server.create('patient', {
    name: "Horace Moss",
    birthday: new Date(1928, 1,2),
    weight: 192,
    targetHgB: 9,
    gender: "M"
  });
}
