import download from 'downloadjs'

export default function (starredRepos, username) {
  let data = `<h1>${username}'s starred repositories :</h1>`
  starredRepos.forEach(repo => {
    data += `<p><a href="${repo.html_url}">${repo.name} (${repo.stars}⭐)</a></p>`
  })
  download(data, `${username}-starred.html`, 'text/html')
}
