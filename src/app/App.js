import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            key: '',
            description: '',
            source: '',
            typeResource: '',
            coverage: '',
            resources: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addResource = this.addResource.bind(this);
    }
    addResource(e) {
        if(this.state._id){
            fetch('/api/resource/'+this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json)
            .then(data => {
                M.toast({ html: 'Recurso editado' });
                this.setState({
                    title: '',
                    key: '',
                    description: '',
                    source: '',
                    typeResource: '',
                    coverage: '',
                    _id: ''
                });
                this.fecthResource();
            })
            .catch(err => console.error(err));
        }else{
            fetch('/api/resource', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Recurso guardado' });
                    this.setState({
                        title: '',
                        key: '',
                        description: '',
                        source: '',
                        typeResource: '',
                        coverage: ''
                    });
                    this.fecthResource();
                })
                .catch(err => console.error(err));
        }
        
        e.preventDefault();
    }

    componentDidMount() {
        this.fecthResource();
    }

    deleteResource(id) {
        if (confirm('Esta seguro de eliminar el recurso')) {
            fetch('/api/resource/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            }).then(res => res.json)
                .then(data => {
                    M.toast({ html: 'Recurso eliminado' });
                    this.fecthResource();
                });
        }
    }

    editResource(id) {
        fetch('/api/resource/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    key: data.key,
                    description: data.description,
                    source: data.source,
                    typeResource: data.typeResource,
                    coverage: data.coverage,
                    _id: data._id
                })
            });
    }

    fecthResource() {
        fetch('/api/resource')
            .then(res => res.json())
            .then(data => {
                this.setState({ resources: data });
                console.log(this.state);
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/* Navigation */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Prueba-Comisión de la verdad</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addResource}>
                                        <div className="row">
                                            <div className="input-file col s12">
                                                <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Titulo" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-file col s12">
                                                <input name="key" onChange={this.handleChange} value={this.state.key} type="text" placeholder="Claves" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-file col s12">
                                                <input name="description" onChange={this.handleChange} value={this.state.description} type="text" placeholder="Descrpción" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-file col s12">
                                                <input name="source" onChange={this.handleChange} value={this.state.source} type="text" placeholder="Fuente" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-file col s12">
                                                <input name="typeResource" onChange={this.handleChange} value={this.state.typeResource} type="text" placeholder="Tipo de recurso" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-file col s12">
                                                <input name="coverage" onChange={this.handleChange} value={this.state.coverage} type="text" placeholder="Cobertura" />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken 4">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr><th>Titulo</th>
                                        <th>Clave</th>
                                        <th>Descripcion</th>
                                        <th>Fuente</th>
                                        <th>Tipo de recurso</th>
                                        <th>Cobertura</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.resources.map(resource => {
                                        return (
                                            <tr key={resource._id}>
                                                <td>{resource.title}</td>
                                                <td>{resource.key}</td>
                                                <td>{resource.description}</td>
                                                <td>{resource.source}</td>
                                                <td>{resource.typeResource}</td>
                                                <td>{resource.coverage}</td>
                                                <td>
                                                    <button onClick={() => this.editResource(resource._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}><i className="material-icons">edit</i></button>
                                                    <button onClick={() => this.deleteResource(resource._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}><i className="material-icons">delete</i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;