import React, {Component} from 'react';

import axios from "axios";
import * as actionTypes from "../../store/actions";
import connect from "react-redux/es/connect/connect";
import './Category.css';
import {TreeView} from '@progress/kendo-treeview-react-wrapper';
import $ from 'jquery';
import kendo from '@progress/kendo-ui';

import '@progress/kendo-theme-default';

import Video from "../../components/Video/Video";



class Category extends Component {

    state = {
        data: [],
        data2: null,

    }

    constructor(props) {

        super(props);

        window.jQuery = $;

        this.dataSource = [{
            id: 1, name: "My Documents", expanded: true, spriteCssClass: "rootfolder", items: [
                {
                    id: 2, text: "Kendo UI Project", expanded: true, spriteCssClass: "folder", items: [
                        {id: 3, text: "about.html", spriteCssClass: "html"},
                        {id: 4, text: "index.html", spriteCssClass: "html"},
                        {id: 5, text: "logo.png", spriteCssClass: "image"}
                    ]
                },
                {
                    id: 6, text: "New Web Site", expanded: true, spriteCssClass: "folder", items: [
                        {id: 7, text: "mockup.jpg", spriteCssClass: "image"},
                        {id: 8, text: "Research.pdf", spriteCssClass: "pdf"},
                    ]
                },
                {
                    id: 9, text: "Reports", expanded: true, spriteCssClass: "folder", items: [
                        {id: 10, text: "February.pdf", spriteCssClass: "pdf"},
                        {id: 11, text: "March.pdf", spriteCssClass: "pdf"},
                        {id: 12, text: "April.pdf", spriteCssClass: "pdf"}
                    ]
                }
            ]
        }]

        this.sender = null;
        this.onDataBound = this.onDataBound.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);


    }


    onDataBound = (e) => {
        this.sender = e.sender;
    }

    onDrag = (e) => {
        //   console.log("event :: dataBound");
        //  console.log("test");

        var dataItem = e.sender.dataItem(e.sourceNode);
        //console.log(dataItem);

    }

    onDrop = (e) => {

        var drag = e.sender.dataItem(e.sourceNode);
        var drop = e.sender.dataItem(e.dropTarget);

        console.log("drag");
        console.log(drag);
        console.log(drag.id);
        console.log("drop");
        console.log(drop);
        console.log(drop.id);

        var data = {id1: drag.id, id2: drop.id};

        axios.post('http://127.0.0.1:8000/api/drag', data).then(response => {
            const posts = response.data;
            console.log(posts);
        });


    }

    onSelect = (e) => {

        var dataItem = e.sender.dataItem(e.node);
        var listenid = dataItem.listen_id;
        var car = {text: "Fiat", model: "500", color: "white"};


        var asdsad = e.sender.items;

        if (listenid != null) {
            this.props.setLoading(true);
            this.props.setListId(listenid);
        }
        else
            this.props.setListId(null);


    }

    onChange = (e) => {
        console.log("event :: change");
        console.log(e);
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/maincategory').then(response => {
            const posts = response.data;
            console.log(posts);
            this.props.setCategories(posts);
            this.props.changeIsLoading(false);
        });

        this.props.changeParentId(null);


        var categories = [];
        axios.get('http://127.0.0.1:8000/api/categories').then(response => {
            categories = response.data;

            console.log("test");

            this.setState({
                data2: categories
            });
            console.log('test');

            console.log(this.state.data2);

        })

    }


    getMainCategories() {
        var categories = [];
        axios.get('http://127.0.0.1:8000/api/maincategory').then(response => {
            categories = response.data;
        })
    }


    getSubCategory(id) {
        var categories = [];
        axios.get('http://127.0.0.1:8000/api/subcategories/' + id).then(response => {
            const posts = response.data;
            categories = posts;
        })
        return categories;
    }


    createMenuTreeHierarchy() {
        var categories = [];
        axios.get('http://127.0.0.1:8000/api/categories').then(response => {
            categories = response.data;

            console.log("test");

            this.setState({
                data2: categories
            });

            console.log(this.state.data2);

        })


    }


    onClickCategory = (id) => {

        var filteredArray = this.props.categories.categories.filter(function (ele) {
            var idad = ele['id'];
            return idad != id;
        });

        console.log("test!23");
        var listenId = this.props.categories.categories.find(x => x.id === id).listen_id;

        console.log(listenId);

        // this.props.setListId();

        if (listenId == null) {
            axios.get('http://127.0.0.1:8000/api/subcategories/' + id).then(response => {
                const posts = response.data;
                console.log(posts);
                this.props.setCategories(posts);
            })
            this.props.changeParentId(id);
        }
        else {
            this.props.setLoading(true);
            this.props.setListId(listenId);
        }
    }

    toogleCategoryOrList = (id, name) => {
        axios.get('http://127.0.0.1:8000/api/subcategories/' + id).then(response => {
            const posts = response.data;
            console.log(posts);
            this.props.setCategories(posts);
        });

        const data = {
            text: name,
            cateid: id

        };

        axios.post('http://127.0.0.1:8000/api/listen', data).then(response => {
            const posts = response.data;
            console.log(posts);
        });
    }


    addNewCategory = (event) => {
        if (event.key == 'Enter') {

            const data = {
                text: this.props.categories.inputValue,
                id: this.props.categories.parentId,
            };

            var newArray = this.props.categories.categories.slice();
            newArray.push(data)
            this.props.setCategories(newArray);

            //   this.props.addToCategories(this.props.categories.inputValue);
            axios.post('http://127.0.0.1:8000/api/category', data).then(response => {
                const posts = response.data;
                console.log(posts);
            });
        }


    }


    toogleVisibilityListCreation = (event) => {
        console.log(this.props.categories.createList);

        var currentVisibility = this.props.categories.createList;

        if (currentVisibility == true) {
            this.props.setCreateList(false);
        }
        else
            this.props.setCreateList(true);

    }


    addNewList = (event) => {
        if (event.key == 'Enter') {

            const data = {
                text: this.props.categories.inputValue,
                id: this.props.categories.parentId,
                spriteCssClass: "list"

            };

            var newArray = this.props.categories.categories.slice();
            newArray.push(data)
            this.props.setCategories(newArray);
           this.sender.append({id: 999, text: this.props.categories.inputValue + " (wird gespeichert...)", spriteCssClass:"list"});


            axios.post('http://127.0.0.1:8000/api/category', data).then(response => {
                const posts = response.data;
                var toBeDeleted = this.sender.dataSource.get(999)
                var result = this.sender.findByUid(toBeDeleted.uid);
                this.sender.remove(result);
                this.sender.append({id: 999, text: this.props.categories.inputValue});

                this.updateDomCategoryElement(999, {id: 999, text: this.props.categories.inputValue, spriteCssClass:"list"});

                var id = posts['quote'].id;

                const data = {
                    text: this.props.categories.inputValue,
                    cateid: id

                };

                axios.post('http://127.0.0.1:8000/api/listen', data).then(response => {
                    const posts = response.data;
                    console.log(posts);
                    var id = posts['quote'].id;

                    var result = this.sender.findByUid(toBeDeleted.uid);
                    this.sender.remove(result);
                    this.updateDomCategoryElement(999, {
                        id: 999,
                        text: this.props.categories.inputValue,
                        listen_id: id,
                        spriteCssClass:"list"
                    });
                });
            });
        }
    }


    updateDomCategoryElement = (id, withObject) => {
        var toBeDeleted = this.sender.dataSource.get(id)
        var result = this.sender.findByUid(toBeDeleted.uid);
        this.sender.remove(result);
        this.sender.append(withObject);
    }


    addNewFolder = (event) => {
        if (event.key == 'Enter') {

            const data = {
                text: this.props.categories.inputValue,
                id: this.props.categories.parentId,
                spriteCssClass: "folder"
            };

            var newArray = this.props.categories.categories.slice();
            newArray.push(data)
            this.props.setCategories(newArray);
            this.sender.append({id: 999, text: this.props.categories.inputValue + " (wird gespeichert...)", spriteCssClass:"folder"});

            axios.post('http://127.0.0.1:8000/api/category', data).then(response => {
                const posts = response.data;
                var toBeDeleted = this.sender.dataSource.get(999)
                var result = this.sender.findByUid(toBeDeleted.uid);
                this.sender.remove(result);
                this.sender.append({id: 999, text: this.props.categories.inputValue, spriteCssClass:"folder"});
            });
        }
    }


    render() {

//https://cdn.rawgit.com/chenglou/react-treeview/aa72ed8b9e0b31fabc09e2f8bd4084947d48bb09/demos/index.html
        var tree;

        if (this.state.data2 != null) {
            tree = (            <div id="treeview">
                <TreeView select={this.onSelect}
                              change={this.onChange}
                              click={this.onChange}
                              drag={this.onDrag}
                              drop={this.onDrop}
                              dataBound={this.onDataBound}
                              dataSource={this.state.data2}
                              dragAndDrop={true}


            /></div>);
        }

        var output;


        output = (
            <div className="Category">
                <div>
                    {tree}
                    <div className="createListButton" onClick={this.toogleVisibilityListCreation}>+ Liste erstellen
                    </div>
                    <div className="createListButton">
                        <input onKeyPress={this.addNewList}
                               className={this.props.categories.createList ? 'NotHidden' : 'Hidden'}
                               onChange={(e) => this.props.changeInputValue(e.target.value)}></input>

                    </div>

                    <div className="createListButton" onClick={this.toogleVisibilityListCreation}>+ Ordner erstellen
                    </div>

                    <div className="createListButton">
                        <input onKeyPress={this.addNewFolder}
                               className={this.props.categories.createList ? 'NotHidden' : 'Hidden'}
                               onChange={(e) => this.props.changeInputValue(e.target.value)}></input>
                    </div>

                </div>

            </div>

        );
        return output
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCategories: (entries) => dispatch({type: actionTypes.SETCATEGORIES, payload: entries}),
        changeInputValue: (inputValue) => dispatch({type: actionTypes.CHANGEINPUTVALUE, payload: inputValue}),
        changeParentId: (newParentId) => dispatch({type: actionTypes.SETPARENTID, payload: newParentId}),
        addToCategories: (newCategory) => dispatch({type: actionTypes.ADDTOCATEGORIES, payload: newCategory}),
        changeIsLoading: (isLoading) => dispatch({type: actionTypes.CHANGEISLOADING, payload: isLoading}),
        setListId: (ListId) => dispatch({type: actionTypes.SETLISTID, payload: ListId}),
        setLoading: (loading) => dispatch({type: actionTypes.SETLOADING, payload: loading}),
        setEntrySaved: (entrySaved) => dispatch({type: actionTypes.SETENTRYSAVED, payload: entrySaved}),
        setCreateList: (createList) => dispatch({type: actionTypes.CREATELIST, payload: createList})


    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        inputValue: state.inputValue,
        parentId: state.parentId,
        isLoading: state.isLoading,
        loading: state.loading,
        createList: state.createList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

