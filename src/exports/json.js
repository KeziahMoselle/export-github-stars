import download from 'downloadjs'

export default function (starredRepos, username) {
  const data = JSON.stringify(starredRepos)
  const blob = new Blob([data])
  download(blob, `${username}-starred.json`, 'application/json')
}
