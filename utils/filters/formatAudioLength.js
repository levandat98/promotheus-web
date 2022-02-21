export default (time) => {
  if (time >= 60 && time <= 3600) {
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    return `${minutes >= 10 ? minutes : ' 0' + minutes.toString()} min ${
      seconds >= 10 ? seconds : ' 0' + seconds.toString()
    } sec`
  } else if (time >= 3600) {
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    return `${hours >= 10 ? hours : ' 0' + hours.toString()} hour ${
      minutes >= 10 ? minutes : ' 0' + minutes.toString()
    }:${seconds >= 10 ? seconds : ' 0' + seconds.toString()} min`
  } else {
    return `${time} sec`
  }
}
