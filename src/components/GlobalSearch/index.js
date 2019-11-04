import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import debounce from 'lodash/debounce'
import { MdSearch as IconSearch } from 'react-icons/md'

import { searchText } from 'reducers/search'

import './style.scss'

@connect(
  ({ search }) => ({ search }),
  {
    searchText,
  },
)
class GlobalSearch extends PureComponent {
  state = {
    isFocused: false,
    textCache: this.props.search.text,
  }

  componentWillUnmount() {
    this.props.searchText('')
  }

  debouncedSearch = debounce(text => this.props.searchText(text), 100)

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  handleChange = e => {
    const text = e.target.value
    this.setState({ textCache: text })
    this.debouncedSearch(text)
  }

  render() {
    const { className } = this.props
    const { isFocused, textCache } = this.state
    return (
      <div
        className={cx('GlobalSearch', className, {
          isFocused,
        })}
      >
        <div className="GlobalSearch--icon-container d-f ai-c jc-c">
          <IconSearch className="GlobalSearch--icon" size={16} />
        </div>
        <input
          className="GlobalSearch--input"
          placeholder="Filter by name"
          value={textCache}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    )
  }
}

export default GlobalSearch
