
export type FooterProps = {
    itemsLeft: number;
    itemsCompleted: number;
    activeFilter: string;
    clearCompletedTodos: () => void;
    updateActiveFilter: (filter: string) => void;
};

function Footer ({itemsLeft, itemsCompleted, activeFilter, clearCompletedTodos, updateActiveFilter} : FooterProps) {

	const handleFilterSelection = (filter : string) => {
		updateActiveFilter(filter);
	}

    return(
        <footer className="footer">
            <span className="todo-count"><strong>{itemsLeft}</strong> item{itemsLeft !== 1 ? 's' : ''} left</span>
				<ul className="filters">
					<li>
						<a onClick={() => handleFilterSelection('All')} className = {activeFilter === 'All' ? "selected" : ""} href="#/">All</a>
					</li>
					<li>
						<a onClick={() => handleFilterSelection('Active')} className = {activeFilter === 'Active' ? "selected" : ""} href="#/active">Active</a>
					</li>
					<li>
						<a onClick={() => handleFilterSelection('Completed')} className = {activeFilter === 'Completed' ? "selected" : ""} href="#/completed">Completed</a>
					</li>
				</ul>
				{itemsCompleted > 0 && (<button onClick={clearCompletedTodos} className="clear-completed">Clear completed</button>)}
        </footer>        
    );
}

export default Footer;
