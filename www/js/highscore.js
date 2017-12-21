(async function highscoreRender() {

let data = ''
let list  = await Game.loadHiScores()

if (Array.isArray(list.list)){
  list.list.forEach((item, index) => {
    if (item.name && item.rounds){
      data += `<tr>
      <th scope="row">${index}</th>
      <td>${item.name}</td>
      <td>${item.rounds}</td>
    </tr>`
    }
  });
}

$('#high-score').append(data);
})()
// highscoreRender();
// setTimeout(() => highscoreRender(game), 1000)
/*  <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table> */
