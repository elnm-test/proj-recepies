import React, { Component } from 'react';
import ContentSection from './ContentSection';
import Spinner from './Spinner';
import utilService from '../services/utilService';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initRecepiesByIngredients, initRecepiesByNutrients } from '../actions/mealsActions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiFoodMenu, BiStar, BiLike } from "react-icons/bi";
import { IoIosLeaf } from "react-icons/io";
import { GiMilkCarton } from "react-icons/gi";

import { appMainTemplateImgs } from '../services/imgService';

export class AppMainTemplate extends Component {

    state = {
        isShowSwiperSection: false,
        isShowSpinner: false
    }


    componentDidMount() {

        const { recepiesByIng, recepiesByNut, type } = this.props;
        let recepies;

        switch (type) {
            case "ing": {
                recepies = recepiesByIng;
                break;
            }
            //Nut type
            default:
                {
                    recepies = recepiesByNut;
                    break;
                }
        }

        //If the store is already init
        console.log(recepies);
        if (recepies.length) {
            this.setState({
                isShowSwiperSection: true
            })
        }
    }

    moveToRecepieDetails = (id) => {
        const { history } = this.props;
        history.push(`/recepie/${id}`);
    }

    findRecepies = async () => {
        const { existIngList,
            nutrientsList,
            initRecepiesByIngredients,
            initRecepiesByNutrients,
            type } = this.props;

        //Random Seconds in Miliseconds
        const rndTime = utilService.getRandomIntInclusive(1500,3500);

        this.setState({
            isShowSpinner: true
        });


        setTimeout(() => {
            switch (type) {
                case "ing": {
                    initRecepiesByIngredients(existIngList);
                    break;
                }

                //nut type
                default: {
                    initRecepiesByNutrients(nutrientsList);
                    break;
                }
            }

            this.setState({
                isShowSwiperSection: true,
                isShowSpinner: false
            })
        }, rndTime);
    }

    getSliderIconsTemplate = (recepie) => {
        let tempIcons = [];
        //let rndNum = utilService.getRandomIntInclusive(0,1);

        if (recepie.vegetarian) tempIcons.push((
            <span className="veggie-icon">
                <IoIosLeaf />
            </span>
        ));

        if (recepie.dairyFree) tempIcons.push((
            < span className="dairy-icon" >
                <GiMilkCarton />
            </span >
        ));

        if (recepie.healthScore > 8) tempIcons.push((
            <span className="popular-icon">
                <BiStar />
            </span>
        ));

        return tempIcons;
    }

    createRecepiesList = (recepies) => {
        const { existIngList } = this.props;
        const elRecepies = (recepies.length) ?
            recepies.map((recepie, idx) => {
                const { usedIngredients } = recepie;
                const { id, title, dishTypes, readyInMinutes, healthScore, aggregateLikes } = recepie.data;
                let elOptionalIcons = [];
                let usedIngInRecepie = null;
                let elUsedIngInRecepie = null;

                const dishTypesStr = dishTypes.map((dishType) => {
                    return dishType.charAt(0).toUpperCase() + dishType.substring(1)
                }).join(', ');
                let imgUrl = `https://spoonacular.com/recipeImages/${id}-90x90.jpg`;

                if (usedIngredients && usedIngredients.length) {

                    usedIngInRecepie = usedIngredients.map((ing) => { return ing.name.toLowerCase(); }).join(',');
                    //let shuffleExistedIngList = utilService.shuffle(existIngList);
                    elUsedIngInRecepie = existIngList.map((existIng, idx) => {
                        let res = (usedIngInRecepie.indexOf(existIng.txt.toLowerCase()) !== -1) ?
                            (<div key={idx} className="list-dot" style={{ backgroundColor: `${existIng.color}` }}></div>) :
                            null;
                        return res;
                    })
                }

                elOptionalIcons = this.getSliderIconsTemplate(recepie.data);
                return (<SwiperSlide onClick={() => { this.moveToRecepieDetails(id) }} className="flex row center justify-start" key={idx}>
                    <img className="swiper-slider-icon" src={imgUrl} alt="" />
                    <div className="swiper-content-container flex column center align-start">
                        <div>{title}</div>
                        <div className="secondary-info">{dishTypesStr}</div>
                        <div className="more-info flex row center space-between">
                            <div>{readyInMinutes} Minutes</div>
                            <div>
                                {/* <span>{healthScore + "Hs "}</span>
                                <span className="health-score-icon">
                                    <GrStatusGood />
                                </span> */}
                                {elOptionalIcons}

                            </div>
                        </div>
                        <div style={{ width: '100%' }} className="flex row center">
                            <div style={{ width: '100%' }} className="flex row center space-between">
                                <div className="flex row center space-between">
                                    {elUsedIngInRecepie}
                                </div>
                                <div>
                                    <span className="likes-section">{aggregateLikes + "k  Likes"}</span>
                                    {/* <span className="likes-icon">
                                        <BiLike />
                                    </span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>)
            }) : null


        return elRecepies;
    }

    createSwiperSection = (elSliders, isShowSwiperSection) => {
        return (
            <div className={`swiper-section ${isShowSwiperSection ? 'swiper-section-open' : ' '}
            flex row center justify-end`}>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    direction={'vertical'}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {elSliders}
                </Swiper>
            </div>
        )
    }


    createImgsGrid = () => {
        console.log('grod')
        let elGrid;
        let elImgsList = appMainTemplateImgs.map((img, idx) => {
            return (<img src={img} className={`grid-img-${idx + 1}`} alt="" />)
        })

        elGrid = (<div className="imgs-grid-container">
            {elImgsList}
        </div>);


        return elGrid;
    }

    createLoaderTemplate = () => {
        const { isShowSpinner } = this.state;
        const elSpinner = isShowSpinner ? ( <React.Fragment>
                                                <h1>Searching Recepies</h1> <span><Spinner /></span>
                                            </React.Fragment>) : null;

        return (<div className="loader-container">
            {elSpinner}
        </div>)
    }

    render() {
        const { isShowSwiperSection } = this.state;
        const { children, recepiesByIng, recepiesByNut, type } = this.props;
        let recepies;

        switch (type) {
            case "ing": {
                recepies = recepiesByIng;
                break;
            }
            //Nut type
            default:
                {
                    recepies = recepiesByNut;
                    break;
                }
        }
        const elSliders = this.createRecepiesList(recepies);
        const elRightSideTemplate = (recepies.length) ? this.createSwiperSection(elSliders, isShowSwiperSection) : this.createLoaderTemplate();

        return (
            <div className="app-main-template-container flex row center">
                {/* Left Side */}
                <div className="content-section">
                    <ContentSection type={type} />
                    {children}
                    <div className="find-recipes-btn-container flex row center">
                        <div onClick={this.findRecepies} className="find-recipes-btn">
                            <div className="inner-circle r">
                                <div className="inner-circle txt-circle">
                                    <div className="find-recepies-icon flex row center"><BiFoodMenu /></div>
                                    <div>Find Recepies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Right Side */}
                {elRightSideTemplate}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { existIngList, recepiesByIng, nutrientsList, recepiesByNut } = state.meals;
    return {
        existIngList,
        nutrientsList,
        recepiesByNut,
        recepiesByIng
    }
}

const mapDispatchToProps = {
    initRecepiesByIngredients,
    initRecepiesByNutrients
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMainTemplate));
