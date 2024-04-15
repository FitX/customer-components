import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import FitxRating, { filterEvenElement } from '@/components/fitx-rating/FitxRating.vue';

describe('App Rating', () => {
  it('rendered correct', async () => {
    const wrapper = shallowMount(FitxRating);
    const div = wrapper.find('.rating');
    const ratings = div.findAll('[data-test^=vote-]');
    expect(ratings.length).toEqual(5);
  });
  it('animation wrapper rendered correct', async () => {
    const wrapper = shallowMount(FitxRating);
    const div = wrapper.find('.rating');
    const ratings = div.findAll('[data-test="animation-wrapper"]');
    expect(ratings.length).toEqual(0);
    const itemToClick = div.find('[data-test=vote-3]');
    await itemToClick.trigger('click');
    const ratingsNow = div.findAll('[data-test="animation-wrapper"]');
    expect(ratingsNow.length).toEqual(1);
  });
  it('rendered correct with props', async () => {
    const wrapper = shallowMount(FitxRating, {
      props: {
        numberOfVotes: 3,
      }
    });
    const div = wrapper.find('.rating');
    const ratings = div.findAll('[data-test^=vote-]');
    expect(ratings.length).toEqual(3);
  });
  it('render correct after vote', async () => {
    const wrapper = shallowMount(FitxRating);
    const div = wrapper.find('.rating');
    const itemToClick = div.find('[data-test=vote-3]');
    await itemToClick.trigger('click');
    expect(div.find('[data-test=vote-3]').element).not.toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-1]').element).toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-2]').element).toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-4]').element).toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-5]').element).toHaveClass('vote--inactive');
  });
  it('emits correct', async () => {
    const wrapper = shallowMount(FitxRating);
    const div = wrapper.find('.rating');
    const itemToClick = div.find('[data-test=vote-3]');
    await itemToClick.trigger('click');
    // expect(wrapper.emitted('success')).toBeTruthy();
    expect(wrapper.emitted('success')[0]).toEqual([3]);
  });
  it('filterEvenElement works', async () => {
    expect(filterEvenElement()).toEqual([]);
    expect(filterEvenElement([])).toEqual([]);
    expect(filterEvenElement([1,2])).toEqual([1]);
    expect(filterEvenElement([1,2,3])).toEqual([1,3]);
    expect(filterEvenElement([
      {
        index: 1,
        title: 'one',
        component: 'iconVote1',
      },
      {
        index: 2,
        title: 'two',
        component: 'iconVote2',
      },
      {
        index: 3,
        title: 'three',
        component: 'iconVote3',
      },
      {
        index: 4,
        title: 'four',
        component: 'iconVote4',
      },
      {
        index: 5,
        title: 'five',
        component: 'iconVote5',
      }
    ])).toEqual([
      {
        index: 1,
        title: 'one',
        component: 'iconVote1',
      },
      {
        index: 3,
        title: 'three',
        component: 'iconVote3',
      },
      {
        index: 5,
        title: 'five',
        component: 'iconVote5',
      }
    ]);
  });
  it('default vote prop rendered correct', async () => {
    const wrapper = shallowMount(FitxRating, {
      props: {
        voted: 4,
      },
    });
    const div = wrapper.find('.rating');
    expect(div.find('[data-test=vote-4]').element).not.toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-1]').element).toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-2]').element).toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-3]').element).toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-5]').element).toHaveClass('vote--inactive');
  });
  it('multiple votes default not possible', async () => {
    const wrapper = shallowMount(FitxRating);
    const div = wrapper.find('.rating');
    const itemToClick = div.find('[data-test=vote-4]');
    await itemToClick.trigger('click');
    expect(div.find('[data-test=vote-4]').element).not.toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-2]').element).toHaveClass('vote--inactive');
    const itemToClick2 = div.find('[data-test=vote-2]');
    await itemToClick2.trigger('click');
    expect(div.find('[data-test=vote-4]').element).not.toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-2]').element).toHaveClass('vote--inactive');
  });
  it('multiple votes are possible', async () => {
    const wrapper = shallowMount(FitxRating, {
      props: {
        preventMultipleVotes: false,
      },
    });
    const div = wrapper.find('.rating');
    const itemToClick = div.find('[data-test=vote-4]');
    await itemToClick.trigger('click');
    expect(div.find('[data-test=vote-4]').element).not.toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-1]').element).toHaveClass('vote--inactive');
    const itemToClick2 = div.find('[data-test=vote-2]');
    await itemToClick2.trigger('click');
    expect(div.find('[data-test=vote-2]').element).not.toHaveClass('vote--inactive');
    expect(div.find('[data-test=vote-4]').element).toHaveClass('vote--inactive');
  });
});
