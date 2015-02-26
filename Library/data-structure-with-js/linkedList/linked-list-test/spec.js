describe('linkedList tests', function(){

  var list = new List();

  it('should find the second item', function(){
    list.add('b');
    expect(list.head.data).toBe('b');
    expect(list.tail.next).toBe(null);

    list.insertAsFirst('a');
    expect(list.head.data).toBe('a');
    expect(list.head.next.data).toBe('b');

    list.insertAfter('b', 'c');
    expect(list.item(2).data).toBe('b');
    expect(list.tail.data).toBe('c');
  });

  it('should remove one item', function(){
    expect(list['delete']('c')).toBe(true);
    list['delete']('a');
    expect(list.head.data).toBe('b');
  });

  var list2 = new List();

  it('should match the json', function(){
    list2.add('c');
    list2.insertAsFirst('d');
    list2.insertAfter('d', 'b');
    expect(JSON.stringify(list2)).toBe('{"head":{"data":"d","next":{"data":"b","next":{"data":"c","next":null}}},"tail":{"data":"c","next":null}}');
  });

  it('should merge the lists', function(){
    var list3 = List.mergeList(list, list2);
    expect(list3.head.data).toBe('d');
    expect(list3.head.next.data).toBe('b');
    expect(list3.head.next.next.data).toBe('c');
    expect(list3.tail.data).toBe('b');
  });
});