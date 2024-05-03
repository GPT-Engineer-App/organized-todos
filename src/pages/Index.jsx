import { useState } from 'react';
import { Box, Flex, Heading, Input, Button, List, ListItem, IconButton, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Box p={5}>
      <Flex as="nav" justify="space-between" align="center" mb={5}>
        <Heading size="lg">Todo App</Heading>
      </Flex>
      <Flex mb={5}>
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button leftIcon={<FaPlus />} ml={2} onClick={addTask} colorScheme="teal">Add</Button>
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
            <Box flex="1">{task.text}</Box>
            <IconButton aria-label="Edit task" icon={<FaEdit />} onClick={() => editTask(task.id, prompt('Edit task:', task.text))} />
            <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => deleteTask(task.id)} ml={2} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;