import React, { useState, useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import Texts from 'constants/staticText'
import { getSuggestions } from "service/api"

import './index.css'

//Component For Resuable Search Box
const Search = () => {
  const [ suggestions, setSuggestions ] = useState([])
  const [ value, setValue ] = useState("")
  const [ showOptions, setShowOptions ] = useState(false)
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

  //Function for hanlding change in the state.
  const handleInputChange = (searchedValue) => {
    setValue(searchedValue)
    handleOnFocus(searchedValue)
  }
  
  //Function for handling the onclick event of the options.
  const handleOnClick = (item) => {
    let searchValueArray = value.split(" ")
    if(searchValueArray){
      searchValueArray[searchValueArray.length - 1] = item
      let finalValue = searchValueArray.toString().replace(/,/g, " ")
      setShowOptions(false)
      setValue(finalValue+" ")
      inputRef.current.focus()
    }
  }

  //Function for handle the focus event for input box.
  const handleOnFocus = async (searchedValue) => {
    const searchValueArray = searchedValue.split(" ")
    if(searchValueArray){
      const options = await getSuggestions(searchValueArray[searchValueArray.length - 1])
      if(options && options.length > 0){
        setSuggestions(options)
        setShowOptions(true)
      }
    }
  }

  //Function For render the Suggestions/Options
  const renderOptions = () => {
    if(showOptions && suggestions && suggestions.length > 0){
      return (
        <div className="option-div">
          {suggestions.map(item => {
              if(item){
                return (
                  <option 
                    key={item}
                    className={`option ${item === lastWord ? "highlight-color" : ""}`} 
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
            onChange={(event) => handleInputChange(event.target.value)}
            value={value}
            onFocus={() => !value && handleOnFocus("")}
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
