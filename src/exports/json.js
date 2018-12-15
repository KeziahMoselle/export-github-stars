import download from 'downloadjs'

export default function (starredRepos, username) {
  if (starredRepos.length === 0) return
  const data = JSON.stringify(starredRepos)
  const blob = new Blob([data])
  download(blob, `${username}-starred.json`, 'application/json')
}
