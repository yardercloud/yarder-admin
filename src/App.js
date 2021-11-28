import { Component } from 'react'
import { debounce } from 'lodash'
import { DateTime } from 'luxon'
import apiService from './services/api.service';
import logo from './assets/logo.png'
import './App.css';

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      level: '',
      limit: 20,
      messages: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  listMessages () {
    const { level, limit, message } = this.state
    const list = { from: 0,  size: limit,  level,  body: message }
    apiService.search(list, messages => {
      this.setState({ messages })
    })
  }

  createdAt (timestamp) {
    return DateTime.fromISO(timestamp).setLocale('en-US').toFormat('F')
  }

  handleInputChange (event) {
    const { name, value } = event.target
    const debounceWait = name === 'message' ? 300 : 0
    this.setState({ [name]: value }, debounce(this.listMessages, debounceWait))
  }

  componentDidMount () {
    this.listMessages()
  }

  render () {
    return (
      <div class="bg-gray-100 min-h-screen">
        <div class="border border-l-0 border-r-0 border-gray-200 p-4 bg-white">
          <div class="container mx-auto px-20">
            <img src={logo} alt="Yarder" />
          </div>
        </div>
        <div class="container mx-auto px-96">
          <div class="flex justify-between my-4">
            <label class="block">
              <div class="text-gray-700">Message</div>
              <input class="py-1 border-gray-200" type="text" placeholder="Search" name="message" value={this.state.message} onChange={this.handleInputChange} />
            </label>
            <label class="block">
              <div class="text-gray-700">Level</div>
              <select class="py-1 border-gray-200" name="level" value={this.state.level} onChange={this.handleInputChange}>
                <option value="">All</option>
                <option value="emergency">Emergency</option>
                <option value="alert">Alert</option>
                <option value="critical">Critical</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="notice">Notice</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </label>
            <label class="block">
              <div class="text-gray-700">Limit</div>
              <select class="py-1 border-gray-200" name="limit" value={this.state.limit} onChange={this.handleInputChange}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
          </div>
        </div>
        <div class="container mx-auto px-20">
          <table class="table-fixed border border-gray-200 bg-white min-w-full">
            <thead>
              <tr class="border border-gray-200">
                <th class="text-left w-1/12 px-4 py-1">Level</th>
                <th class="text-left w-8/12 px-4 py-1">Message</th>
                <th class="text-left w-3/12 px-4 py-1">Created at</th>
              </tr>
            </thead>
            <tbody class="divide-y border-gray-200">
              {
                this.state.messages.map(message => {
                  return (
                    <tr>
                      <td class="text-left px-4 py-1">{message.level}</td>
                      <td class="text-left px-4 py-1">
                        <code class="bg-gray-800 text-sm block text-gray-300  px-3 py-2 rounded">
                          {message.body}
                        </code>
                      </td>
                      <td class="text-left px-4 py-1">{this.createdAt(message.timestamp)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
