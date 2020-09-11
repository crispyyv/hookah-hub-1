const API_KEY =
  "f5d44ee1bb2dd36094d4f84796d9b74c44b78c21a2e08589ef1cec8ac4cfc68a";

function Photo(props) {
  return (
    <div className="post small">
      <div className="cardWrapper">
        <figure
          className="cardImg"
          style={{ backgroundImage: `url(${props.photo})` }}
        />
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      original: [],
      error: undefined
    };
  }

  gettingPhotos = async e => {
    e.preventDefault();
    var querry = e.target.elements.querry.value;

    const api_url = await fetch(
      `https://cors-anywhere.herokuapp.com/https://serpapi.com/search.json?engine=google&q=кальян+${querry}&google_domain=google.com&tbm=isch&filter=0&device=desktop&api_key=${API_KEY}`
    );
    const data = await api_url.json();
    var i = 1;
    const origs = [],
    for (i; i < 10; i++) {
      origs.push(data.images_results[i].original);
    }
    this.setState({
      original: origs,
      error: " "
    });
  };

  render() {
    return (
      <div className="App-comp">
        <div className="Info-comp">
          <h2> Поиск кальянов </h2>
          <p> Вы услышали название неизвестного кальяна? </p>
          <p> Просто напиши название и мы найдем тебе фото этого кальяна! </p>
        </div>
        <form className="Search-comp" onSubmit={this.gettingPhotos}>
          <input
            placeholder="Название кальяна"
            type="text"
            name="querry"
            className="nonestyle"
            required
          />
          <button className="react-btn">
            {" "}
            <i className="fas fa-search react-i"> </i>{" "}
          </button>
        </form>
        <div className="results-photos">
          {this.state.original.map(photo => {
            return <Photo photo={photo} key={Math.random()} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
