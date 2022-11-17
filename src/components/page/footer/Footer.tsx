import { NavLink } from "react-router-dom";

export type FooterProps = {
    itemsLeft: number;
    itemsCompleted: number;
    clearCompletedTodos: () => void;
};

function Footer ({itemsLeft, itemsCompleted, clearCompletedTodos} : FooterProps) {

    return(
        <footer className="footer">
            <span className="todo-count"><strong>{itemsLeft}</strong> item{itemsLeft !== 1 ? 's' : ''} left</span>
				<ul className="filters">
					<li>
						<NavLink 
							to="/" 
							className = { (link) => {
								return link.isActive ? 'selected' : ''
							}}>
							All
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/active" 
							className = { (link) => {
								return link.isActive ? 'selected' : ''
							}}>
							Active
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/completed" 
							className = { (link) => {
								return link.isActive ? 'selected' : ''
							}}>
							Completed
						</NavLink>
					</li>
				</ul>
				{itemsCompleted > 0 && (<button onClick={clearCompletedTodos} className="clear-completed">Clear completed</button>)}
        </footer>        
    );
}

export default Footer;
