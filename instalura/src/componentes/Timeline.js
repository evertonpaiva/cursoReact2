import React, { Component } from 'react';
import FotoItem from './Foto';
import Pubsub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

  like(fotoId){
    const token = localStorage.getItem('auth-token');
    fetch(
      //`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${token}`,
      `https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${token}`,
      {method: 'POST'}
    )
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('Não foi possível curtir a foto');
        }
      })
      .then(liker => {
        Pubsub.publish(
          'atualiza-liker',
          {
            fotoId,
            liker
          }
        );
      });
  }

  comenta(fotoId, textoComentario){
    const token = localStorage.getItem('auth-token');

    const requestInfo = {
      method: 'POST',
      body:JSON.stringify({texto:textoComentario}),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch(
      //`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`,
      `https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`,
      requestInfo)
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error('Não foi possível comentar');
        }
      })
      .then(novoComentario => {
        Pubsub.publish('novos-comentarios',
          {
            fotoId,
            novoComentario
          }
        );
      })
  }

  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {
          this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like} comenta={this.comenta}/>)
        }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
