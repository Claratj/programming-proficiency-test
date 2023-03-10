import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  // it('should render a filter section', () => {
    //select
    //input-search
    //input-date desde & hasta
    //create button
  // });

  // it('should render a table', ()=> {
    //if !this.filters --> loading
    //headings of the table
    //one user
    //buttons edit && erase
  // });

  // it('should eliminate the row selected when the erase button is clicked', ()=> {
  // });
});

// describe('Modal.vue', () => {
//   it('should open a modal when Crear is clicked', ()=>{
//   });
//   it('should open a modal when Editar is clicked', ()=> {

//   });
//   it('should render a Modal', ()=> {
//   });
// });
