import React, { Component } from 'react';
import FotoItem from './Foto';
import Pubsub from 'pubsub-js';

export default class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {fotos: []};
    this.login = this.props.login;
  }

  componentWillMount() {
    Pubsub.subscribe('timeline',(topico, fotos) => {
      this.setState({fotos});
    });
  }

  componentDidMount() {
    this.carregaFotos(this.props);
  }

  carregaFotos(){
    let urlPerfil;

    if(this.login === undefined) {
      const token = localStorage.getItem('auth-token');
      urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${token}`;
    } else {
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
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

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.login !== undefined){
      this.login = nextProps.login;
      this.carregaFotos();
    }
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
