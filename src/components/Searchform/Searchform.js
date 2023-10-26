import './Searchform.css';
import search from '../../images/ui/search.svg';

export default function Searchform ({request ,handleChangeSearchValue, handleSwitch, handleSearch, isError, errorMessage, shortFilter}){

  return(
    <>
    <form id="form-search" className="search-form" noValidate onSubmit={(e) => handleSearch(e)}>
      <div  className="search-form__container">
        <img className="search-form__search-image" alt="иконка поиска" src={search}/>
        <input className="search-form__input" placeholder="Фильм" name="filmToSearch" type="text" onChange={handleChangeSearchValue} value={request || ''} required/>
        <button className="search-form__find-button button-hover" onClick={handleSearch} type="button">Найти</button>
        <div className="search-form__vertical-rule"/>
      </div>
      <div className="search-form__container">
        <label className="search-form__switch button-hover">
          <input onClick={handleSwitch} type="checkbox" checked={shortFilter}/>
          <span className="search-form__slider search-form__round"></span>
        </label>
        <label className="search-form__checkbox-label">Короткометражки</label>
      </div>
    </form>
      {isError && <p style={{textAlign: 'center'}}>{errorMessage}</p>}
    </>
  )
}