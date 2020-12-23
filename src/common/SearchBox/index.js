import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Form } from 'react-bootstrap'

import Texts from 'constants/staticText'
import { getSuggestions } from "service/api"
import { debounce } from "lodash";

import './index.css'

//Component For Resuable Search Box
const Search = () => {
  const [ suggestions, setSuggestions ] = useState([])
  const [ value, setValue ] = useState("")
  const [ showOptions, setShowOptions ] = useState(false)
  const [ activeOptionIndex, setActiveOptionIndex ] = useState(null)
  
  const inputRef = useRef()
  const node = useRef();

  //Function For Handle Click Out of Div Event
  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      setShowOptions(false)
    }
  };

  //Hooks For adding Mouse Event
  useEffect(() => {
    // add when mounted
      document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  //Variables for value which is used in component. 
  const searchValueArray = value.split(" ")
  const lastWord = searchValueArray[searchValueArray.length - 1]
  
  //Function for handle the focus event for input box.
  const handleOnFocus = async (searchedValue) => {
    const searchValueArray = searchedValue.split(" ")
    if(searchValueArray){
      const options = await getSuggestions(searchValueArray[searchValueArray.length - 1])
      if(options && options.length > 0){
        const filteredOptions = options.filter(item => item !== "")
        setSuggestions(filteredOptions)
        setShowOptions(true)
        setActiveOptionIndex(null)
      }
    }
  }
  
  //Debounce On change handler  
  const debouncedInputChange = useCallback(debounce(handleOnFocus, 500), [])

  //Function for hanlding change in the state.
  const handleInputChange = (event) => {
    event.preventDefault()
    const searchedValue = event.target.value
    setValue(searchedValue)
    let latestSearchValueArray = searchedValue.split(" ")
    if(lastWord !== latestSearchValueArray[latestSearchValueArray.length - 1]){
      debouncedInputChange(searchedValue)
    }else{
      setShowOptions(false)
    }
  }
  
  //Function for handling the onclick event of the options.
  const handleOnClick = (item) => {
    let searchValueArray = value.split(" ")
    if(searchValueArray || item){
      searchValueArray[searchValueArray.length - 1] = item
      let finalValue = searchValueArray.toString().replace(/,/g, " ")
      setShowOptions(false)
      setValue(finalValue+" ")
      setActiveOptionIndex(null)
      inputRef.current.focus()
    }
  }

  //Function For render the Suggestions/Options
  const renderOptions = () => {
    if(showOptions && suggestions && suggestions.length > 0){
      return (
        <div className="option-div">
          {suggestions.map((item, index) => {
              if(item){
                return (
                  <option 
                    key={item}
                    className={`option ${item === lastWord ? "highlight-color" : ""} 
                    ${activeOptionIndex === index ? "active-option" : ""}`} 
                    onClick={() => handleOnClick(item)}
                  >
                    {item}
                  </option>
                )
              }
              return null
            })
          }
        </div>
      )
    } 
    return null
  }

  //Function for handle Key press
  const handleKeyPress = (event) => {
    let activeIndex = activeOptionIndex === null ? 0 : activeOptionIndex
    switch(event.keyCode){
      case 38:
        if(activeIndex !== -1){
          --activeIndex
          setActiveOptionIndex(activeIndex)
        }
        break;
      case 40:
        if(activeIndex < suggestions.length - 1){
          activeIndex = activeOptionIndex === null ? activeIndex : ++activeIndex
          setActiveOptionIndex(activeIndex)
        }
        break;
      case 13:
        event.preventDefault()
        activeOptionIndex !== null && handleOnClick(suggestions[activeOptionIndex])
        break;
      default:
        return;
    }
  }

  //Function For render the Custom Search Box.
  const renderSearchBox = () => {
    return (
      <Form.Group>
        <Form.Label>{Texts.SEARCH}</Form.Label>
        <div ref={node}>
          <Form.Control 
            ref={inputRef}
            type="text" 
            autoComplete="off"
            placeholder={Texts.PLACEHOLDER}
            onChange={handleInputChange}
            value={value}
            onFocus={() => !activeOptionIndex && !value && handleOnFocus("")}
            onKeyDown={handleKeyPress}
          >
          </Form.Control>
          {renderOptions()}
        </div>
      </Form.Group>
    )
  }

  //Return the JSX of SerchBox.
  return (
    <div className="parent-container">
			<Form >
				{renderSearchBox()}
			</Form>
    </div>
  )
}

Search.propTypes = {
}

export default Search
