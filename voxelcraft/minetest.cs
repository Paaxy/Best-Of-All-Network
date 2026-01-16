using UnityEngine;
using System.Collections.Generic;

public class VoxelWorld : MonoBehaviour {
    public int chunkSize = 16;
    public int viewDistance = 3;
    public int maxHeight = 20;
    public GameObject player;
    public Material blockMaterial;
    Dictionary<Vector2Int, GameObject> chunks = new();

    void Start() {
        GenerateChunks();
    }

    void Update() {
        GenerateChunks();
        HandleBlockInteraction();
        ApplyGravity();
    }

    void GenerateChunks() {
        Vector2Int playerChunk = new(
            Mathf.FloorToInt(player.transform.position.x / chunkSize),
            Mathf.FloorToInt(player.transform.position.z / chunkSize)
        );

        for (int x = -viewDistance; x <= viewDistance; x++) {
            for (int z = -viewDistance; z <= viewDistance; z++) {
                Vector2Int pos = new(playerChunk.x + x, playerChunk.y + z);
                if (!chunks.ContainsKey(pos)) {
                    GameObject chunk = new GameObject($"Chunk_{pos.x}_{pos.y}");
                    chunk.transform.position = new Vector3(pos.x * chunkSize, 0, pos.y * chunkSize);
                    chunk.AddComponent<MeshFilter>();
                    chunk.AddComponent<MeshRenderer>().material = blockMaterial;
                    chunk.GetComponent<MeshFilter>().mesh = GenerateChunkMesh(pos);
                    chunks[pos] = chunk;
                }
            }
        }
    }

    Mesh GenerateChunkMesh(Vector2Int chunkPos) {
        List<Vector3> verts = new();
        List<int> tris = new();
        List<Vector2> uvs = new();
        int faceCount = 0;

        for (int x = 0; x < chunkSize; x++) {
            for (int z = 0; z < chunkSize; z++) {
                int worldX = x + chunkPos.x * chunkSize;
                int worldZ = z + chunkPos.y * chunkSize;
                int height = Mathf.FloorToInt(Mathf.PerlinNoise(worldX * 0.1f, worldZ * 0.1f) * maxHeight);

                for (int y = 0; y <= height; y++) {
                    Vector3 pos = new(x, y, z);
                    AddCube(pos, ref verts, ref tris, ref uvs, faceCount++);
                }
            }
        }

        Mesh mesh = new();
        mesh.vertices = verts.ToArray();
        mesh.triangles = tris.ToArray();
        mesh.uv = uvs.ToArray();
        mesh.RecalculateNormals();
        return mesh;
    }

    void AddCube(Vector3 pos, ref List<Vector3> verts, ref List<int> tris, ref List<Vector2> uvs, int face) {
        Vector3[] cubeVerts = {
            pos + new Vector3(0,0,0), pos + new Vector3(1,0,0), pos + new Vector3(1,1,0), pos + new Vector3(0,1,0), // Front
            pos + new Vector3(0,0,1), pos + new Vector3(1,0,1), pos + new Vector3(1,1,1), pos + new Vector3(0,1,1)  // Back
        };

        int[] cubeTris = {
            0,2,1, 0,3,2, // Front
            5,6,4, 6,7,4, // Back
            3,7,2, 2,7,6, // Top
            0,1,4, 1,5,4, // Bottom
            1,2,5, 2,6,5, // Right
            4,7,0, 7,3,0  // Left
        };

        for (int i = 0; i < cubeVerts.Length; i++) verts.Add(cubeVerts[i]);
        for (int i = 0; i < cubeTris.Length; i++) tris.Add(cubeTris[i] + face * 8);
        for (int i = 0; i < 6; i++) uvs.AddRange(new Vector2[] {
            new(0,0), new(1,0), new(1,1), new(0,1)
        });
    }

    void HandleBlockInteraction() {
        if (Input.GetMouseButtonDown(0)) {
            if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), out RaycastHit hit, 5f)) {
                Vector3Int pos = Vector3Int.RoundToInt(hit.point - hit.normal * 0.5f);
                // Remove block logic here
            }
        }
        if (Input.GetMouseButtonDown(1)) {
            if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), out RaycastHit hit, 5f)) {
                Vector3Int pos = Vector3Int.RoundToInt(hit.point + hit.normal * 0.5f);
                // Place block logic here
            }
        }
    }

    void ApplyGravity() {
        Rigidbody rb = player.GetComponent<Rigidbody>();
        if (rb && !Physics.Raycast(player.transform.position, Vector3.down, 1.1f)) {
            rb.velocity += Vector3.down * 9.8f * Time.deltaTime;
        }
    }
}
