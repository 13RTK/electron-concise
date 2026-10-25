# Find out all node_modules and delete them
find . -name "node_modules" -exec rm -rf {} \;

# Find all out directories and delete them
find . -name "out" -exec rm -rf {} \;