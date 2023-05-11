import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <div className={css.item}>
            <p>
              <span>{name}</span>
              <span>: {number}</span>
            </p>

            <button onClick={() => onDeleteContact(id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
