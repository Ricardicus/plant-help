# plant-help
I need to keep track of when to water my plants at home

# run 

```
./setup.sh
```

# docker

Build and run:

```
docker build -t plant-help . && docker run --rm -it -v $(pwd)/data:/app/data -p 3000:3000 plant-help
```

visit localhost:3000 and get started.
