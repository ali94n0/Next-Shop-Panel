

import CheckBox from '@/common/CheckBox';
import { HiOutlineChevronUp } from 'react-icons/hi';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';

function FilterSidebar({categories}) {

    return (
        <div className='col-span-1 p-4 -mt-16'>
            <div className='sticky top-24 right-0'>
                {/* category filter: */}
                <CategoryFilter categories={categories} />
                {/* sort filter */}
                <SortFilter/>
            </div>
            
        </div>
    );
}

export default FilterSidebar;