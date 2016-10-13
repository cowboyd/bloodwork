export default function configure(server) {
  let phil = server.create('patient', {
    name: "Phil Lowell",
    birthday: new Date(1931, 7, 9),
    weight: 185,
    targetHgB: 9.5
  });
}
