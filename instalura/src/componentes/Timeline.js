import React, { Component } from 'react';
import FotoItem from './Foto';

export default class Timeline extends Component {

  constructor() {
    super();
    this.state = {fotos: []};
  }

  componentDidMount() {

    let urlPerfil;

    if(this.props.login === undefined) {
      const token = localStorage.getItem('auth-token');
      urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${token}`;
    } else {
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${this.props.login}`;
    }

    fetch(urlPerfil)
    //fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`)
      .then(response => response.json())
      .then(fotos => {
        this.setState({
          fotos: fotos
        });
      })
      .catch(erro => console.log(erro));
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/>)
        }
      </div>
    );
  }
}
