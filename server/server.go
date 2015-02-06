package server

import (
	"fmt"
	"html/template"
	"net/http"
	"net/url"

	"github.com/coreos-inc/bridge/etcd"
	"github.com/coreos-inc/bridge/fleet"
)

const (
	BridgeAPIVersion      = "v1"
	IndexPageTemplateName = "index.html"
)

type jsGlobals struct {
	K8sVersion string `json:"k8sVersion"`
}

type Server struct {
	FleetClient   *fleet.Client
	EtcdClient    *etcd.Client
	K8sEndpoint   *url.URL
	K8sAPIVersion string
	PublicDir     string
	Templates     *template.Template
}

func (s *Server) HTTPHandler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle("/api/kubernetes/", http.StripPrefix("/api/kubernetes/", s.k8sHandler()))

	bridgePrefix := fmt.Sprintf("/api/bridge/%s/", BridgeAPIVersion)
	registerDiscovery(bridgePrefix, mux)
	_, err := NewClusterService(bridgePrefix, mux, s.EtcdClient, s.FleetClient)
	if err != nil {
		panic(err)
	}

	// Respond with 404 for any other API rquests.
	mux.HandleFunc("/api/", notFoundHandler)

	// Serve all static files from public dir.
	staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir(s.PublicDir)))
	mux.Handle("/static/", staticHandler)

	// Serve index page for anything else.
	mux.HandleFunc("/", s.indexHandler)

	return http.Handler(mux)
}

func (s *Server) k8sHandler() http.Handler {
	t := *s.K8sEndpoint
	t.Path = "/api"
	proxy := newProxy(proxyConfig{
		Target:          t,
		HeaderBlacklist: []string{"Cookie"},
	})
	return proxy
}

func (s *Server) indexHandler(w http.ResponseWriter, r *http.Request) {
	jsg := &jsGlobals{
		K8sVersion: s.K8sAPIVersion,
	}
	if err := s.Templates.ExecuteTemplate(w, IndexPageTemplateName, jsg); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func notFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte("not found"))
}
