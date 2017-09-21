const data = Array.apply(0, new Array(1900 + 1)).map(i => 0)

// for (let i = 0; i < 13305600000; i++) {
for (let i = 0; i < 1000; i++) {
  const input = Math.floor(Math.random() * 1901)
  data[input] += 1
}

console.log(JSON.stringify(data))