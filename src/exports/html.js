import download from 'downloadjs'

export default function (starredRepos, username) {
  const header = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${username}'s starred repositories</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" />
    </head>
    <body class="container">
      <h1 style="margin-top: 40px; margin-bottom: 10px;">${username}'s</h1>
      <h2 style="">Starred repositories</h2>
      <table class="u-full-width">
        <thead>
          <tr>
            <th>Repository</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
  `
  let body = ''
  starredRepos.forEach(repo => {
    body +=
    `<tr>
      <td>
        <a href="${repo.html_url}">${repo.name}</a>
      </td>
      <td>${repo.stars}⭐</td>
    </tr>`
  })
  const footer = ` 
        </tbody>
      </table>
    </body>
    </html>
  `
  const data = `${header} ${body} ${footer}`
  download(data, `${username}-starred.html`, 'text/html')
}
