import React, { Component } from 'react';

class FotoHeader extends Component {

  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img
            src="https://instagram.fbsb9-1.fna.fbcdn.net/vp/5e2536595ff3a38630582e8a3958fab4/5DADEC00/t51.2885-19/s150x150/47585230_1261912117290129_2590421692501196800_n.jpg?_nc_ht=instagram.fbsb9-1.fna.fbcdn.net"
            alt="foto do usuario" />
          <figcaption className="foto-usuario">
            <a href="#">
              alots
            </a>
          </figcaption>
        </figure>
        <time className="foto-data">03/10/2016 20:13</time>
      </header>
    );
  }
}

class FotoInfo extends Component {

  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">

          <a href="#">
            alots_ssa
                    </a>

          ,

                    <a href="#">
            rafael_rollo
                    </a>

          curtiram

                  </div>

        <p className="foto-info-legenda">
          <a className="foto-info-autor">autor </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
                  </p>

        <ul className="foto-info-comentarios">
          <li className="comentario">
            <a className="foto-info-autor">seguidor </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
                    </li>
          <li className="comentario">
            <a className="foto-info-autor">seguidor </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt cumque earum molestias voluptatem
            modi nihil sit magnam ratione eveniet distinctio magni error asperiores dignissimos tempora
            expedita, laborum ex soluta hic maiores veritatis deserunt.
                    </li>
          <li className="comentario">
            <a className="foto-info-autor">seguidor </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum laudantium quae ab fuga odio
            delectus maiores voluptatibus sit commodi quidem.
                    </li>
        </ul>
      </div>
    );
  }
}

class FotoAtualizacoes extends Component {

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a href="#" className="fotoAtualizacoes-like">Likar</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>

      </section>
    );
  }
}

export default class Foto extends Component {

  render() {
    return (
      <div className="foto">
        <FotoHeader/>
        <img alt="foto" className="foto-src"
          src="https://static.boredpanda.com/blog/wp-content/uploads/2016/12/best-photos-2016-natgeo-national-geographic-92.jpg" />

        <FotoInfo/>
        <FotoAtualizacoes/>
      </div>
    );
  }
}
