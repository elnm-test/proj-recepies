import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';

/* Views */
import RecipeByIngredients from './views/RecipeByIngredients';
import RecipeByNutrients from './views/RecipeByNutrients';
import RecepieDetails from './views/RecepieDetails';
import Homepage from './components/Homepage';
import { connect } from 'react-redux';


function App({ mealsByIng, mealsByNut }) {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/ingredients" component={RecipeByIngredients} />
        <Route exact path="/nutrients" component={RecipeByNutrients} />
        <Route exact path="/recepie/:id" component={RecepieDetails} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { mealsByIng, mealsByNut } = state.meals;
  return {
    mealsByIng,
    mealsByNut
  }
}





export default connect(mapStateToProps)(App);
