interface Person2 {
  name: string;
  age: number;
}

type Person3 = {
  name: string;
  age: number;
};

/*
Feature                     Interface
Can describe object shapes : yes

Can describe unions & primitives : no

Can be extended or implemented by classes : yes
Can be merged (declaration merging)  :Yes (interfaces with same name merge)
*/

/*
Feature                     Type Alias
Can describe object shapes : yes

Can describe unions & primitives : yes

Can be extended or implemented by classes : No (cannot be implemented by classes)
Can be merged (declaration merging)  :No (type aliases with same name cause errors)
*/