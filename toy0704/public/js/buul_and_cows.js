const input = '1563';
const checkbox = [];
function stringToObject(str) {
  return Object.fromEntries(
    Array.from(str, (char, index) => [index, char])
  );
}

// 사용 예시
const result = stringToObject(input);
console.log(result);