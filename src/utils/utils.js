function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function setLocal(name, items) {
    localStorage.setItem(name, JSON.stringify(items));
  }
  
function getLocal(name) {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name))
    } else {
      return []
    }
}

function removeLocal(name)  {
    localStorage.removeItem(name);
}

export {
    getRandom,
    setLocal,
    getLocal,
    removeLocal
}