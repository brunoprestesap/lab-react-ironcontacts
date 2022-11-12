import { useState } from "react";
import "./App.css";
import Contacts from "./contacts.json";
import thropy from "./assets/1f3c6.png";

function App() {
  const [contacts, setContacts] = useState(Contacts.slice(0, 5));

  function getRandomContact() {
    const contactRandom = Math.floor(Math.random() * (Contacts.length - 5) + 5);
    const newContact = Contacts[contactRandom];
    setContacts(contacts => [...contacts, newContact]);
  }

  function sortBy(field) {

    if (field === 'name') {
      const contactsSortByName = contacts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      })
      
      setContacts(() => [...contactsSortByName]);
    } else if (field === 'popularity') {
      const contactsSortByPopularity = contacts.sort((a, b) => a.popularity - b.popularity);
      setContacts(() => [...contactsSortByPopularity]);
    }
  }

  function deleteContact(key){
    const contactDelete = contacts.filter((contact) => contact.id !== key);
    setContacts(() => [...contactDelete]);
  }

  const listContacts = contacts.map((contact) => (
    
    <tr key={contact.id}>
      <td>
        <img src={contact.pictureUrl} alt="img"></img>
      </td>
      <td>{contact.name}</td>
      <td>{contact.popularity}</td>
      <td>
        {contact.wonEmmy && (
          <img className="throphy" src={thropy} alt="athor"></img>
        )}
      </td>
      <td>
        {contact.wonOscar && (
          <img className="throphy" src={thropy} alt="athor"></img>
        )}
      </td>
      <td>
        <button onClick={() => deleteContact(contact.id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <button onClick={() => getRandomContact()}>Add Random Contact</button>
      <button onClick={() => sortBy('popularity')}>Sort by popularity</button>
      <button onClick={() => sortBy('name')}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>
              <span>Picture</span>
            </th>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Popularity</span>
            </th>
            <th>
              <span>Won Emmy</span>
            </th>
            <th>
              <span>Won Oscar</span>
            </th>
            <th>
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>{ listContacts }</tbody>
      </table>
    </div>
  );
}

export default App;
